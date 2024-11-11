from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix='calice_',
        env_file='.env.local',
        extra='ignore'
    )

    database_url: str
    app_secret: str

settings = Settings()