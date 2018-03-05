/**
 * @flow
 */

import React, {PureComponent, Children} from 'react';
import PropTypes from 'prop-types';
import {Spin} from 'antd';
import App from '../app';
import {Bucket, Cache, EndpointMiddleware, Store} from '../middleware';
import Endpoint from '../endpoint';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';

type Props = {
  appId: string,
  schema: {[key: string]: any},
  endpoint: {[key: string]: Endpoint},
  children: any,
  dataDidChange: void => void
}

type State = {
  isFetching: boolean,
  fetched: boolean,
  shouldFetch: boolean,
}

export default class Provider extends PureComponent<Props, State> {
  app: App

  static childContextTypes = {
    subscribe: PropTypes.func,
    request: PropTypes.func,
    fetch: PropTypes.func,
    deploy: PropTypes.func,
  };

  constructor(props: Props) {
    super(props);
    (this: any).request = this.request.bind(this);
    (this: any).subscribe = this.subscribe.bind(this);
    (this: any).fetch = this.fetch.bind(this);
    const {schema, endpoint} = props;
    this.state = {
      shouldFetch: false,
      isFetching: false,
      fetched: false,
    };
    this.app = new App()
      .use(new Store())
      .use(new Bucket())
      .use(new Cache())
      .use(new EndpointMiddleware({schema, endpoint}));
  }

  componentWillReceiveProps(nextProps: Props) {
    const {schema} = this.props;
    const schemaKey = Object.keys(schema);
    const nextSchemaKey = Object.keys(nextProps.schema);
    if (!isEqual(schemaKey, nextSchemaKey)) {
      this.app = new App()
        .use(new Store())
        .use(new Bucket())
        .use(new Cache())
        .use(new EndpointMiddleware({schema: nextProps.schema, endpoint: nextProps.endpoint}));
    }
  }

  getChildContext() {
    return {
      subscribe: this.subscribe,
      request: this.request,
      fetch: this.fetch,
      deploy: this.deploy,
      // createAction
    };
  }

  fetch(key: string, componentId: string, query: queryType, mutate: Mutate): Promise.resolve<*> {
    return this.app.handleChange({
      request: {
        type: 'fetch',
        key,
        query,
        componentId,
      },
      response: {
        mutate,
      },
    });
  }

  subscribe(key: string, componentId: string, subjectType: SubjectType, observer: rxjs$Observer<*>) {
    return this.app.handleChange({
      request: {
        type: 'subscribe',
        key,
        observer,
        componentId,
        subjectType,
      },
    }).then((ctx) => ctx.response.subscription);
  }

  request(action: MutateAction) {
    // const {cannerJSON} = this.state;
    const {dataDidChange} = this.props;
    if (action.type !== 'NOOP') {
      const {key} = action.payload;
      return this.app.handleChange({
        request: {
          type: 'write',
          action,
          key,
        },
      }).then(dataDidChange);
    }
  }

  deploy = (key: string, id: string) => {
    return this.app.handleChange({
      request: {
        type: 'deploy',
        key,
        id,
      },
    });
  }

  _splitKey(path: string | [string, string]) {
    return isArray(path) ?
      path[0].split('/')[0] :
      // $FlowFixMe
      path.split('/')[0];
  }

  render() {
    const {isFetching} = this.state;
    const props = {
      ...this.props,
    };
    if (isFetching) {
      return <div style={{
        'width': '100%',
        'height': '100%',
        'display': 'flex',
        'align-items': 'center',
        'justfy-content': 'center',
      }}>
          <Spin tip="讀取中..."/>
        </div>;
    }
    return Children.only(React.cloneElement(this.props.children, {...props}));
  }
}