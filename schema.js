const axios = require("axios");
const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLSchema,
} = require("graphql");

// All People Type
const AllPeopleType = new GraphQLObjectType({
	name: "People",
	fields: () => ({
		count: { type: GraphQLInt },
		// people: { type: PersonType },
	}),
});

// Person Type
const PersonType = new GraphQLObjectType({
	name: "Person",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		height: { type: GraphQLInt },
		mass: { type: GraphQLInt },
		gender: { type: GraphQLString },
	}),
});

// Root Query
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		allPeople: {
			type: AllPeopleType,
			resolve(parent, args) {
				return axios
					.get("https://swapi.dev/api/people/")
					.then((res) => res.data);
			},
		},
		person: {
			type: PersonType,
			args: {
				id: { type: GraphQLInt },
			},
			resolve(parent, args) {
				return axios
					.get(`https://swapi.dev/api/people/${args.id}`)
					.then((res) => res.data);
			},
		},
		
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
