from calice.database import client

collection = client.tournaments

class TournamentRepository:
    async def find():
        tournaments = await collection.find().to_list(length=100)

        return tournaments

    async def create(tournament):
        new_tournament = await collection.insert_one(
            tournament.model_dump(by_alias=True, exclude=["id"])
        )

        created_tournament = await collection.find_one(
            { "_id": new_tournament.inserted_id }
        )

        return created_tournament