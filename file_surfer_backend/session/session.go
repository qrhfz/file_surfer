package session

import (
	"database/sql"
	"errors"
	"fmt"
	"math/rand"
	"time"
)

type SessionStore struct {
	db *sql.DB
}

func NewSessionStore(db *sql.DB) *SessionStore {
	s := SessionStore{
		db: db,
	}

	return &s
}

func (s *SessionStore) SetSession(content string) (string, error) {
	var ttl int64 = 24 * 60 * 60 * 1000
	expired := time.Now().UTC().UnixMilli() + ttl

	token := randomString(32)
	_, err := s.db.Exec(`
		INSERT 
		INTO session_store(token, content, expired)
		VALUES (?,?,?);
	`, token, content, expired)

	if err != nil {
		return "", err
	}

	return token, nil
}

func (s *SessionStore) GetSession(token string) error {
	row := s.db.QueryRow(`SELECT content, expired FROM session_store WHERE token=?;`, token)
	var content string
	var expired int64

	if err := row.Scan(&content, expired); err != nil {
		return err
	}

	if time.Now().UTC().UnixMilli() > expired {
		s.RemoveSession(token)
		return errors.New("token expired")
	}

	return nil
}

func (s *SessionStore) RemoveSession(token string) error {
	_, err := s.db.Exec(`DELETE FROM session_store WHERE token=?;`, token)

	return err
}

func randomString(length int) string {
	rand.Seed(time.Now().UnixNano())
	b := make([]byte, length)
	rand.Read(b)
	return fmt.Sprintf("%x", b)[:length]
}
