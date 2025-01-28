from typing import List, Dict


def filter_resources(
    resources: List[Dict],
    category: str = None,
    skill_level: str = None,
    max_items: int = 3
) -> List[Dict]:
    """
    Filters the resources based on category and skill_level.
    Returns up to 'max_items' items.
    If category or skill_level is None, do not filter on that criterion.
    """

    filtered = []
    for r in resources:
        if category and r.get("category") != category:
            continue
        if skill_level and r.get("skill_level") != skill_level:
            continue
        filtered.append(r)

    return filtered[:max_items]
