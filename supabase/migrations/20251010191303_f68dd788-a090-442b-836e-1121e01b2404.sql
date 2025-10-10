-- Update services to use flaticon classes instead of lucide
UPDATE services 
SET icon = CASE
  WHEN title = 'Economic Development' THEN 'flaticon-investment'
  WHEN title = 'Social Progress' THEN 'flaticon-heartbeat'
  WHEN title = 'International Relations' THEN 'flaticon-world'
  WHEN title = 'Democratic Governance' THEN 'flaticon-balance'
  WHEN title = 'Infrastructure Development' THEN 'flaticon-building'
  WHEN title = 'Environmental Protection' THEN 'flaticon-leaf'
  ELSE 'flaticon-briefcase'
END;