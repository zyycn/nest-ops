import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import Database from 'better-sqlite3'
const db = new Database('./src/foobar.db', { verbose: console.log })
db.exec(`
  CREATE TABLE IF NOT EXISTS cats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`)

const stmt = db.prepare('INSERT INTO cats (name, age) VALUES (?, ?)')
const info = stmt.run('Joey', 2)

console.log(info.changes) // => 1

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      database: 'cats',
      models: []
    })
  ]
})
export class DBModule {}
