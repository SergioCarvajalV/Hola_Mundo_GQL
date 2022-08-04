import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import { GraphQLSchema } from 'graphql';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import expressPlayGround from "graphql-playground-middleware-express"
const app = express();

app.use(cors());
app.use(compression());

const typeDefs = `
    type Query {
        hola: String!
        holaConNombre(nombre: String!): String!
        numero:Int!
    }
`;

const resolvers = {
    Query:{
        hola(): string{
            return "HOLA MUNDO";
        },
        holaConNombre(root:object, args: { name:string}, context: object, info:object): string{
            console.log(info);
            return `Hola ${args.name}`;
        },
        numero(): number{
            return 1;
        }
    }
}

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true
});

server.applyMiddleware({app});

app.use('/hola', (_,res) => {
    res.send('Hola mundo');
});

app.use('/', expressPlayGround({
    endpoint: "/graphql"
}));

const PORT = 5000;

const httpServer = createServer(app)

app.listen(
    { port: PORT},
    ()=> console.log(`Hola mundo API GQL http://localhost:${PORT}`)
);