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
  },
  Mutation: {
    deleteEvents(_,args) {
      data.events = data.events.filter((e)=> e.id !== parseInt(args.id));
      return data.events;
    },
    deleteLocations(_,args) {
      data.locations = data.locations.filter((e)=> e.id !== parseInt(args.id));
      return data.locations;
    },
    deleteParticipants(_,args) {
      data.participants = data.participants.filter((e)=> e.id !== parseInt(args.id));
      return data.participants;
    },
    deleteUsers(_,args) {
      data.users = data.users.filter((e)=> e.id !== parseInt(args.id));
      return data.users;
    },
    addEvent(_,args) {
      let game = {
        ...args.event,
        id: Math.floor(Math.random()*10000)
      }
      data.events.push(game);
      return game;
    },
    addLocations(_,args) {
      let location = {
        ...args.location,
        id: Math.floor(Math.random()*10000)
      }
      data.locations.push(location);
      return location;
    },
    addParticipants(_,args) {
      let participant = {
        ...args.participant,
        id: Math.floor(Math.random()*10000)
      }
      data.participants.push(participant);
      return participant;
    },
    addUsers(_,args) {
      let user = {
        ...args.user,
        id: Math.floor(Math.random()*10000)
      }
      data.users.push(user);
      return user;
    },
    updateEvent(_,args) {
      data.events = data.events.map((e)=>{
        if (e.id === parseInt(args.id)) {
          return {...e, ...args.edit}
        }
        return e
      })
      return data.events.find((e)=> e.id === parseInt(args.id));
    },
    updateLocations(_,args) {
      data.locations = data.locations.map((e)=>{
        if (e.id === parseInt(args.id)) {
          return {...e, ...args.edit}
        }
        return e
      })
      return data.locations.find((e)=> e.id === parseInt(args.id));
    },
    updateParticipants(_,args) {
      data.participants = data.participants.map((e)=>{
        if (e.id === parseInt(args.id)) {
          return {...e, ...args.edit}
        }
        return e
      })
      return data.participants.find((e)=> e.id === parseInt(args.id));
    },
    updateUser(_,args) {
      data.users = data.users.map((e)=>{
        if (e.id === parseInt(args.id)) {
          return {...e, ...args.edit}
        }
        return e
      })
      return data.users.find((e)=> e.id === parseInt(args.id));
    },
    deleteAllEvents: () =>{
      const length = data.events.length;
      data.events.splice(0,length);
      return{
        count: length,
      };
    },
    deleteAllLocations: () =>{
      const length = data.locations.length;
      data.locations.splice(0,length);
      return{
        count: length,
      };
    },
    deleteAllParticipants: () =>{
      const length = data.participants.length;
      data.participants.splice(0,length);
      return{
        count: length,
      };
    },
    deleteAllUsers: () =>{
      const length = data.users.length;
      data.users.splice(0,length);
      return{
        count: length,
      };
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
