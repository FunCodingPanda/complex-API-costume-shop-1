## complex-API-costume-shop
Building a complex API from scratch for a costume shop that includes the following:

# Costumes:
•   ID: (String) A unique id that represents the costume, created automatically
•   Name: (String)Name of the costume. Required
•   Price:  (Number) Price of the costume. Cannot be less than 1 cent. Required
•   Description: (String) A description of the costume. Optional
•   Tags: (Array) An array of tags

# Tags:
•   ID: (String) A unique id that represents the tag. Created automatically
•   Name: (String) Name of the tag. Cannot be longer than 10 characters. Required
•   Color: (String) A color to be associated with the tag. Must be a valid hex color code (e.g. #123456). Optional

RESTful routes will include:
•   Create, Read, Update, and Delete costumes
•   Create, Read, Update, and Delete tags through costumes
