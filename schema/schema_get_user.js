const schemaGetUsers = {
    "type": "object",
    "required": [
        "id",
        "name",
        "phone_number",
        "address",
        "point",
        "vehicles"
    ],
    "additionalProperties": false,
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "phone_number": {
            "type": "string"
        },
        "address": {
            "type": "string"
        },
        "point": {
            "type": "integer"
        },
        "vehicles": {
            "type": "array",
            "additionalItems": false,
            "items": {
                "type": "object",
                "required": [
                    "name",
                    "type"
                ],
                "additionalProperties": false,
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    }
                }
            },
            "uniqueItems": false
        }
    }
};

module.exports = {
    schemaGetUsers,
}