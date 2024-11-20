from typing import List
from fastapi import APIRouter
from calice.repositories import ruleset
from calice.models.validation.ruleset import RulesetCreate, RulesetRead, RulesetUpdate
from calice.dependencies.security import can_manage_tournament

router = APIRouter(prefix="/rulesets", dependencies=[can_manage_tournament])


@router.post("/", response_model=RulesetRead)
async def create_ruleset(
    ruleset: RulesetCreate, ruleset_repository: ruleset.repository
):
    new_ruleset = await ruleset_repository.create(ruleset)

    return new_ruleset


@router.patch("/", response_model=RulesetRead)
async def update_ruleset(
    ruleset: RulesetUpdate, ruleset_repository: ruleset.repository
):
    updated_ruleset = await ruleset_repository.update(ruleset)

    return updated_ruleset
