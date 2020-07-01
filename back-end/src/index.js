const { ApolloServer, gql } = require("apollo-server")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(
    'dbname',
    'username',
    'password',
    {
        'host': 'db',
        'dialect': 'mysql'
    }
)

const PeopleModel = sequelize.define('people', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

sequelize.sync({
    force: false,
})
.then(() => PeopleModel.create({
    name: 'dave1',
    age: 18,
    gender: 'male'
}))
.then(() => PeopleModel.create({
    name: 'dave2',
    age: 19,
    gender: 'female'
}))
.then(() => PeopleModel.create({
    name: 'dave3',
    age: 20,
    gender: 'male'
}))

const Peoples = sequelize.models.people

const typeDefs = gql`
    type Peoples {
        id:Int!
        name: String!
        age: Int!
        gender: String!
    }

    type Query{
        peoples: [Peoples]!
        people(id: Int!): Peoples
    }

    type Mutation {
        createPeople(name: String!, age: Int!, gender: String!): Peoples!
        deletePeople(id: Int!): Peoples
        updatePeople(id: Int!, name: String, age: Int, gender: String): Peoples
    }
`

const resolvers = {
    Query: {
        // people: () => [
        //     {
        //         id : 1,
        //         name: "dave",
        //         age: 18,
        //         gender: "male"  
        //     },
        //     {
        //         id : 2,
        //         name: "dave2",
        //         age: 19,
        //         gender: "male"  
        //     },
        //     {
        //         id : 3,
        //         name: "dave3",
        //         age: 20,
        //         gender: "male"  
        //     },
        // ]

        peoples: () => {
            return Peoples.findAll()
        },
        people: (_, args) => {
            return Peoples.findOne({
                where: args
            })
        }
    },
    Mutation: {
        createPeople: (_, args) => {
            const people = Peoples.create({
                name: args.name,
                age: args.age,
                gender: args.gender
            })
            return people
        },
        deletePeople: (_, args) => {
            const people = Peoples.destroy({
                where: args
            })
            return {id: args.id}
        },
        updatePeople: (_, args) => {
            const data = {};
            if(args.name !== undefined){
                data.name = args.name
            }
            if(args.age !== undefined){
                data.age = args.age
            }
            if(args.gender !== undefined){
                data.gender = args.gender
            }
            const people = Peoples.update(data, {
                where: {id: args.id}
            })
            return {id: args.id}
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const PORT = 9090

// server.listen().then(({url}) => {
//     console.log(`listening at ${url}`)
// })

server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
})