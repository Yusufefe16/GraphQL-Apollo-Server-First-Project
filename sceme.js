export const typeDefs = `#graphql

    type Event {
        id: ID!
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID! 
        user_id: ID!
        location: Location!
        user: User!
    }

    input AddEventInput {
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID! 
        user_id: ID!
    }

    input EditEventInput{
        title: String
        desc: String
        date: String
        from: String
        to: String
        location_id: ID
        user_id: ID
    }

    type Location{
        id: ID!
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
    }

    input AddLocationInput {
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
    }

    input EditLocationsInput {
        name: String
        desc: String
        lat: Float
        lng: Float
    }

    type Participant{
        id:ID!
        user_id: ID!
        event_id: ID!
        user: User!
        event: Event!
    }

    input AddParticipantInput {
        user_id: ID!
        event_id: ID!
    }

    input EditParticipantsInput {
        user_id: ID
        event_id: ID
    }

    type User{
        id: ID!
        username: String!
        email: String!
    }
    
    input AddUserInput {
        username: String!
        email: String!
    }

    input EditUserInput {
        username: String
        email: String
    }

    type DeleteAllOutput {
        count: Int!
    }

    type Query {
        events: [Event]
        event(id: ID!): Event
        locations: [Location]
        location(id:ID!): Location
        participants: [Participant]
        participant(id:ID!):Participant
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        addEvent(event: AddEventInput!): Event
        addLocations(location: AddLocationInput!): Location
        addParticipants(participant: AddParticipantInput!): Participant
        addUsers(user: AddUserInput!): User
        deleteEvents(id:ID!): [Event]
        deleteLocations(id:ID!): [Location] 
        deleteParticipants(id:ID!): [Participant]
        deleteUsers(id:ID!): [User]
        updateEvent(id:ID!, edit: EditEventInput!): Event
        updateLocations(id:ID!, edit: EditLocationsInput!): Location
        updateParticipants(id:ID!, edit: EditParticipantsInput!): Participant
        updateUser(id:ID!, edit: EditUserInput!): User
        deleteAllEvents: DeleteAllOutput!
        deleteAllLocations: DeleteAllOutput!
        deleteAllParticipants: DeleteAllOutput!
        deleteAllUsers: DeleteAllOutput!
    }

    type Subscription {
        eventCreated: Event!
        userCreated: User!
        participantAdded: Participant!
    }

`;
