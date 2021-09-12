package core

import (
	"context"
	"encoding/json"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateNewPost(c echo.Context) error {
	jsonMap := make(map[string]interface{})
	err := json.NewDecoder(c.Request().Body).Decode(&jsonMap)
	if err != nil {
		return c.String(400, "{Error: \"Unable to decode JSON\", StatusCode: 400}")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	mongoClient, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		return c.String(400, "{Error: \"Unable to insert in DB\", StatusCode: 400}")
	}

	_, err = mongoClient.Database("Anoninetwork").Collection("Posts").InsertOne(ctx, bson.D{{"Title", jsonMap["Title"]}, {"Content", jsonMap["Content"]}, {"Tags", jsonMap["Tags"]}})
	if err != nil {
		return c.String(400, "{Error: \"Unable to insert in DB\", StatusCode: 400}")
	}

	return c.String(200, "{Error: null, StatusCode: 200}")
}

func ReadPosts(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	mongoClient, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		return c.String(400, "{Error: \"Unable to insert in DB\", StatusCode: 400}")
	}

	cursor, err := mongoClient.Database("Anoninetwork").Collection("Posts").Find(ctx, bson.D{})
	if err != nil {
		return c.String(400, "{Error: \"Unable to find in DB\", StatusCode: 400}")
	}

	defer cursor.Close(ctx)

	var posts []string

	for cursor.Next(ctx) {
		var result Post

		err := cursor.Decode(&result)
		if err != nil {
			return c.String(400, "{Error: \"Unable to find in DB\", StatusCode: 400}")
		}

		post, err := json.Marshal(result)
		if err != nil {
			return c.String(400, "{\"Error\": \"Unable to unmarshal struct to JSON\", \"StatusCode\": 400}")
		}

		posts = append(posts, string(post))
	}

	res := strings.Join(posts, ", ")

	return c.String(200, "{\"Error\": null, \"StatusCode\": 200, \"Posts\": ["+res+"]}")
}
