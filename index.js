import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// data.json dosyasını içe aktarın
import data from "./data.js";

/* console.log(data.events.find((e)=>e.id === 1)); */


import { typeDefs } from "./sceme.js";

const resolvers = {
  Query: {
    events() {
      return data.events;
    },
    event(_, args) {
      return data.events.find((e) => e.id === parseInt(args.id));
    },
    locations() {
      return data.locations;
    },
    location(_, args) {
      return data.locations.find((l) => l.id === parseInt(args.id));
    },
    participants() {
      return data.participants;
    },
    participant(_, args) {
      return data.participants.find((p) => p.id === parseInt(args.id));
    },
    users() {
      return data.users;
    },
    user(parent, args, contextValue, info) {
      return data.users.find((u) => u.id === parseInt(args.id));
    },
  },
  Event: {
    location(parent) {
      return data.locations.find((l)=>l.id === parseInt(parent.location_id));
    },
    user(parent) {
      return data.users.find((u)=>u.id === parseInt(parent.user_id));
    }
  },
  Participant: {
    user(parent) {
      return data.users.find((u)=>u.id === parseInt(parent.user_id));
    },
    event(parent) {
      return data.events.find((e)=>e.id === parseInt(parent.event_id));
    }
  }
};
//server setup

const server = new ApolloServer({
  //typeDefs
  typeDefs,

  //resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`Server ready at ${url}`);
