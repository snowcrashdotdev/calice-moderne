from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix='calice_',
        env_file='.env',
        extra='ignore'
    )

    database_url: str = 'postgresql+asyncpg://calice:calice@db:5432/calice_dev'
    app_secret: str = 'c33de679efc3d867589fb34f3874e12942379b35cc246350f18dbd81032b0d5f'

settings = Settings()