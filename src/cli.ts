import * as program from 'commander';
import {version as VERSION} from './tools/package';
import * as ora from 'ora';
import $ from './tools/wrap-action';
import getSchema from './lib/get-schema';
import translate from './lib/translate';
import * as log from './tools/log';

program.version(VERSION, '-v --version');

program
  .command('validate <filename>')
  .description('Validate the JSONSchema')
  .action($(async (filename: string) => {
    ora.promise(getSchema(filename), `Loading schema from "${filename}"`).succeed('JSONSchema is valid').fail('JSONSchema is invalid');
  }));

program
  .command('translate <filename> <tableName>')
  .description('Create a SQL Table Definition from a JSONSchema')
  .action($(async (filename: string, tableName: string) => {
    const spinner = new ora().start(`Loading schema from "${filename}"`);
    const schema = await getSchema(filename);
    spinner.text = 'Finished loading schema';
    spinner.text = 'Translating schema to SQL';
    const sql = await translate(schema, tableName);
    spinner.succeed('Finished').stop();
    log.log('\n', sql);
  }));

program.parse(process.argv);
