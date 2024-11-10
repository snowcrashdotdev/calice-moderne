from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix='calice_',
        env_file='.env',
        extra='ignore'
    )

    database_url: str = 'postgresql+asyncpg://calice:calice@db:5432/calice_dev'

settings = Settings()