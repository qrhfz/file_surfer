package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var Base = ""

func init() {
	fmt.Println("loading dot env")
	err := godotenv.Load("local.env")
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}
	Base = os.Getenv("BASE")
}
