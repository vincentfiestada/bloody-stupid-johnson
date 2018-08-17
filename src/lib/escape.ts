import chalk from 'chalk';

/**
 * Escape a column or table name
 */
export default function escape(name: string): string {
  return chalk.cyanBright(`\`${name}\``);
}
