import { DataSource } from "typeorm"

export const ds = new DataSource({
    type: "sqlite",
    database: "src/data/db.sqlite",
    entities: [ "src/entities/*.ts" ]
})

ds.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })