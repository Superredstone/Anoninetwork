package main

import "github.com/Superredstone/Anoninetwork/anoninetwork-backend/core"

func main() {
	server := core.CreateServer()

	server.Logger.Fatal(server.Start(":3001"))
}
