from bson import ObjectId
from calice.database import client

collection = client.tournaments

class TournamentRepository:
    async def find():
        tournaments = await collection.find().to_list(length=100)

        return tournaments
    
    async def findOne(slug):
        tournament = await collection.find_one({ "slug": slug })

        return tournament

    async def create(tournament):
        new_tournament = await collection.insert_one(
            tournament.model_dump(by_alias=True, exclude=["id"])
        )

        created_tournament = await collection.find_one(
            { "_id": new_tournament.inserted_id }
        )

        return created_tournament
    
    async def update(tournament):
        id = ObjectId(tournament.id)
        result = await collection.update_one({ "_id": id }, { "$set": tournament.model_dump(by_alias=True, exclude=["id", "slug"])})

        updated_document = await collection.find_one({ "_id": id })

        return updated_document