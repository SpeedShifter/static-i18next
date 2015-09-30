/// <reference path="./inc.d.ts" />
/*
 * static-i18next
 * 
 *
 * Copyright (c) 2015 Stas Yermakov
 * Licensed under the MIT license.
 */

'use strict';

import _ = require('lodash');
import i18next = require('i18next-client');
import htmlparser = require('htmlparser');

export module StaticI18Next {

  export interface ITaskOptions {
    lang: string;
    i18next: I18nextOptions;
    lodashTemplate?: _.TemplateSettings;
  }

  export class Task {

    constructor(private options: ITaskOptions) {

    }

    process(value: string) {
      value = _.trim(value);
    }

  }

}

(new StaticI18Next.Task({lang: 'dev', i18next: {}})).process('<html><head><!-- task --><link rel="css/some.css"></head></html>');