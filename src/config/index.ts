import convict from 'convict';

interface MyConfig {
  PORT: number;
  HOST: string;
  DATABASE_URL: string;
}
const config = convict<MyConfig>({
  PORT: {
    doc: 'The port to bind.',
    format: Number,
    default: 8000,
    env: 'PORT',
  },
  HOST: {
    doc: 'The host to bind.',
    format: String,
    default: 'http://localhost',
    env: 'HOST',
  },
  DATABASE_URL: {
    doc: 'The database connection URL.',
    format: String,
    default: 'postgres://ntqouthr:Kq1xuaXMsJoo2g8Sq8FWcsoUYvV_vqJg@abul.db.elephantsql.com/ntqouthr',
    env: 'DATABASE_URL',
  },
});

// Валидация конфигурации
config.validate({ allowed: 'strict' });

export default config;