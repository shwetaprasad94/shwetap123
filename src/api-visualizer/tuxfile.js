module.exports = {
	"register": {
		"static": {
			"route": "static",
			"directory": "public"
		},
		"view": {
			"engines": ["dust"],
			"path": "views"
		}
	},
	"harnesses": [
		{
			"route": "hello",
      "view": "fruits.dust",
			"data": {
				"message": "Hello Fruits",
				"fruits": ["Apple", "Banana", "Cherry", "Durrian"]
			}
		},
		{
			"route": "facebook",
			"data": "http://graph.facebook.com/github"
		}
	]
};
