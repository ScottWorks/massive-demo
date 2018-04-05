select incidents.id, state, injuries.name as injury, affectedareas.name, causes.name
from incidents join injuries on incidents.injuryid = injuries.id join affectedareas on injuries.affectedareaid = affectedareas.id join causes on incidents.causeid = causes.id
where
  state = ${state}