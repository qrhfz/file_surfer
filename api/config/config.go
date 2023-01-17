package config

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/crypto/bcrypt"
)

var Base = ""

func init() {
	_ = godotenv.Load("local.env")
	// if err != nil {
	// 	log.Fatalf("Some error occured. Err: %s", err)
	// }
	Base = os.Getenv("BASE")
}

const HashCost = bcrypt.DefaultCost

const logFormat = `${remote_ip} [${time_custom}] "${method} ${uri} ${protocol}" ${status} ${bytes_out}b
`

type loggerWriter struct {
	logFile *os.File
}

func (w loggerWriter) Write(p []byte) (n int, err error) {
	os.Stdout.Write(p)
	return w.logFile.Write(p)
}

func LoggerConf(logFile *os.File) middleware.LoggerConfig {
	w := loggerWriter{logFile: logFile}

	return middleware.LoggerConfig{
		Skipper:          middleware.DefaultSkipper,
		Format:           logFormat,
		CustomTimeFormat: "02/Jan/2006:15:04:05 -0700",
		Output:           w,
	}
}
