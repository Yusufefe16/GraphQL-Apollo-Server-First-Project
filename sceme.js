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

    type Location{
        id: ID!
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
    }

    type Participant{
        id:ID!
        user_id: ID!
        event_id: ID!
        user: User!
        event: Event!
    }

    type User{
        id: ID!
        username: String!
        email: String!
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

`;
