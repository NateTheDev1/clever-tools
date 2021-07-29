import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type AddPropertyInput = {
  name: Scalars['String'];
  address: Scalars['String'];
  year: Scalars['String'];
};

export type AddRoomInput = {
  propertyId: Scalars['Int'];
  name: Scalars['String'];
  available: Scalars['Boolean'];
  year: Scalars['String'];
};

export type CacheControlScope =
  | 'PUBLIC'
  | 'PRIVATE';

export type CreateUserInput = {
  admin: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  password: Scalars['String'];
  createdBy?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  addProperty: Property;
  deleteProperty: Scalars['Boolean'];
  addRoom: Room;
  deleteRoom: Scalars['Boolean'];
  createUser: User;
  login: Scalars['String'];
};


export type MutationAddPropertyArgs = {
  input: AddPropertyInput;
};


export type MutationDeletePropertyArgs = {
  id: Scalars['Int'];
};


export type MutationAddRoomArgs = {
  input: AddRoomInput;
};


export type MutationDeleteRoomArgs = {
  id: Scalars['Int'];
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};

export type Property = {
  id: Scalars['Int'];
  name: Scalars['String'];
  address: Scalars['String'];
  totalRooms: Scalars['Int'];
  availableRooms: Scalars['Int'];
  year: Scalars['String'];
};

export type PropertyEntity = {
  property: Property;
  rooms: Array<Maybe<Room>>;
};

export type Query = {
  getProperties: Array<Maybe<Property>>;
  getStatistics: Statistic;
  getPropertyEntity: PropertyEntity;
  getUser: User;
};


export type QueryGetPropertiesArgs = {
  year: Scalars['String'];
};


export type QueryGetPropertyEntityArgs = {
  propertyId: Scalars['Int'];
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type Room = {
  id: Scalars['Int'];
  propertyId: Scalars['Int'];
  name: Scalars['String'];
  available: Scalars['Boolean'];
  year: Scalars['String'];
  updates: Array<Maybe<UpdateLog>>;
};

export type Statistic = {
  totalProperties: Scalars['Int'];
  totalOpenRooms: Scalars['Int'];
  totalUnavailableRooms: Scalars['Int'];
  totalRooms: Scalars['Int'];
};

export type UpdateLog = {
  id: Scalars['Int'];
  roomId: Scalars['Int'];
  timestamp: Scalars['String'];
  room: Scalars['String'];
};


export type User = {
  id: Scalars['Int'];
  admin: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  createdAt: Scalars['String'];
  createdBy?: Maybe<Scalars['String']>;
};

export type AddPropertyMutationVariables = Exact<{
  input: AddPropertyInput;
}>;


export type AddPropertyMutation = { addProperty: { id: number } };

export type AddRoomMutationVariables = Exact<{
  input: AddRoomInput;
}>;


export type AddRoomMutation = { addRoom: { id: number } };

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = { createUser: { id: number, name?: Maybe<string>, username: string, admin: boolean, createdAt: string, createdBy?: Maybe<string> } };

export type DeletePropertyMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePropertyMutation = { deleteProperty: boolean };

export type DeleteRoomMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteRoomMutation = { deleteRoom: boolean };

export type LoginMutationVariables = Exact<{
  credentials: LoginInput;
}>;


export type LoginMutation = { login: string };

export type GetPropertiesQueryVariables = Exact<{
  year: Scalars['String'];
}>;


export type GetPropertiesQuery = { getProperties: Array<Maybe<{ id: number, name: string, address: string, totalRooms: number, availableRooms: number, year: string }>> };

export type GetPropertyEntityQueryVariables = Exact<{
  propertyId: Scalars['Int'];
}>;


export type GetPropertyEntityQuery = { getPropertyEntity: { property: { id: number, name: string, address: string, year: string }, rooms: Array<Maybe<{ id: number, name: string, available: boolean, year: string, updates: Array<Maybe<{ id: number, timestamp: string, room: string }>> }>> } };

export type GetStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatisticsQuery = { getStatistics: { totalProperties: number, totalOpenRooms: number, totalUnavailableRooms: number, totalRooms: number } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = { getUser: { id: number, name?: Maybe<string>, username: string, admin: boolean, createdAt: string, createdBy?: Maybe<string> } };


export const AddPropertyDocument = gql`
    mutation AddProperty($input: AddPropertyInput!) {
  addProperty(input: $input) {
    id
  }
}
    `;
export type AddPropertyMutationFn = Apollo.MutationFunction<AddPropertyMutation, AddPropertyMutationVariables>;

/**
 * __useAddPropertyMutation__
 *
 * To run a mutation, you first call `useAddPropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPropertyMutation, { data, loading, error }] = useAddPropertyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPropertyMutation(baseOptions?: Apollo.MutationHookOptions<AddPropertyMutation, AddPropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPropertyMutation, AddPropertyMutationVariables>(AddPropertyDocument, options);
      }
export type AddPropertyMutationHookResult = ReturnType<typeof useAddPropertyMutation>;
export type AddPropertyMutationResult = Apollo.MutationResult<AddPropertyMutation>;
export type AddPropertyMutationOptions = Apollo.BaseMutationOptions<AddPropertyMutation, AddPropertyMutationVariables>;
export const AddRoomDocument = gql`
    mutation AddRoom($input: AddRoomInput!) {
  addRoom(input: $input) {
    id
  }
}
    `;
export type AddRoomMutationFn = Apollo.MutationFunction<AddRoomMutation, AddRoomMutationVariables>;

/**
 * __useAddRoomMutation__
 *
 * To run a mutation, you first call `useAddRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRoomMutation, { data, loading, error }] = useAddRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddRoomMutation(baseOptions?: Apollo.MutationHookOptions<AddRoomMutation, AddRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRoomMutation, AddRoomMutationVariables>(AddRoomDocument, options);
      }
export type AddRoomMutationHookResult = ReturnType<typeof useAddRoomMutation>;
export type AddRoomMutationResult = Apollo.MutationResult<AddRoomMutation>;
export type AddRoomMutationOptions = Apollo.BaseMutationOptions<AddRoomMutation, AddRoomMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user) {
    id
    name
    username
    admin
    createdAt
    createdBy
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeletePropertyDocument = gql`
    mutation DeleteProperty($id: Int!) {
  deleteProperty(id: $id)
}
    `;
export type DeletePropertyMutationFn = Apollo.MutationFunction<DeletePropertyMutation, DeletePropertyMutationVariables>;

/**
 * __useDeletePropertyMutation__
 *
 * To run a mutation, you first call `useDeletePropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePropertyMutation, { data, loading, error }] = useDeletePropertyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePropertyMutation(baseOptions?: Apollo.MutationHookOptions<DeletePropertyMutation, DeletePropertyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePropertyMutation, DeletePropertyMutationVariables>(DeletePropertyDocument, options);
      }
export type DeletePropertyMutationHookResult = ReturnType<typeof useDeletePropertyMutation>;
export type DeletePropertyMutationResult = Apollo.MutationResult<DeletePropertyMutation>;
export type DeletePropertyMutationOptions = Apollo.BaseMutationOptions<DeletePropertyMutation, DeletePropertyMutationVariables>;
export const DeleteRoomDocument = gql`
    mutation DeleteRoom($id: Int!) {
  deleteRoom(id: $id)
}
    `;
export type DeleteRoomMutationFn = Apollo.MutationFunction<DeleteRoomMutation, DeleteRoomMutationVariables>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoomMutation, DeleteRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(DeleteRoomDocument, options);
      }
export type DeleteRoomMutationHookResult = ReturnType<typeof useDeleteRoomMutation>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const LoginDocument = gql`
    mutation Login($credentials: LoginInput!) {
  login(credentials: $credentials)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetPropertiesDocument = gql`
    query GetProperties($year: String!) {
  getProperties(year: $year) {
    id
    name
    address
    totalRooms
    availableRooms
    year
  }
}
    `;

/**
 * __useGetPropertiesQuery__
 *
 * To run a query within a React component, call `useGetPropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertiesQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetPropertiesQuery(baseOptions: Apollo.QueryHookOptions<GetPropertiesQuery, GetPropertiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertiesQuery, GetPropertiesQueryVariables>(GetPropertiesDocument, options);
      }
export function useGetPropertiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertiesQuery, GetPropertiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertiesQuery, GetPropertiesQueryVariables>(GetPropertiesDocument, options);
        }
export type GetPropertiesQueryHookResult = ReturnType<typeof useGetPropertiesQuery>;
export type GetPropertiesLazyQueryHookResult = ReturnType<typeof useGetPropertiesLazyQuery>;
export type GetPropertiesQueryResult = Apollo.QueryResult<GetPropertiesQuery, GetPropertiesQueryVariables>;
export const GetPropertyEntityDocument = gql`
    query GetPropertyEntity($propertyId: Int!) {
  getPropertyEntity(propertyId: $propertyId) {
    property {
      id
      name
      address
      year
      year
    }
    rooms {
      id
      name
      available
      year
      updates {
        id
        timestamp
        room
      }
    }
  }
}
    `;

/**
 * __useGetPropertyEntityQuery__
 *
 * To run a query within a React component, call `useGetPropertyEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropertyEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropertyEntityQuery({
 *   variables: {
 *      propertyId: // value for 'propertyId'
 *   },
 * });
 */
export function useGetPropertyEntityQuery(baseOptions: Apollo.QueryHookOptions<GetPropertyEntityQuery, GetPropertyEntityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPropertyEntityQuery, GetPropertyEntityQueryVariables>(GetPropertyEntityDocument, options);
      }
export function useGetPropertyEntityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPropertyEntityQuery, GetPropertyEntityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPropertyEntityQuery, GetPropertyEntityQueryVariables>(GetPropertyEntityDocument, options);
        }
export type GetPropertyEntityQueryHookResult = ReturnType<typeof useGetPropertyEntityQuery>;
export type GetPropertyEntityLazyQueryHookResult = ReturnType<typeof useGetPropertyEntityLazyQuery>;
export type GetPropertyEntityQueryResult = Apollo.QueryResult<GetPropertyEntityQuery, GetPropertyEntityQueryVariables>;
export const GetStatisticsDocument = gql`
    query GetStatistics {
  getStatistics {
    totalProperties
    totalOpenRooms
    totalUnavailableRooms
    totalRooms
  }
}
    `;

/**
 * __useGetStatisticsQuery__
 *
 * To run a query within a React component, call `useGetStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatisticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatisticsQuery(baseOptions?: Apollo.QueryHookOptions<GetStatisticsQuery, GetStatisticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatisticsQuery, GetStatisticsQueryVariables>(GetStatisticsDocument, options);
      }
export function useGetStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatisticsQuery, GetStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatisticsQuery, GetStatisticsQueryVariables>(GetStatisticsDocument, options);
        }
export type GetStatisticsQueryHookResult = ReturnType<typeof useGetStatisticsQuery>;
export type GetStatisticsLazyQueryHookResult = ReturnType<typeof useGetStatisticsLazyQuery>;
export type GetStatisticsQueryResult = Apollo.QueryResult<GetStatisticsQuery, GetStatisticsQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: Int!) {
  getUser(id: $id) {
    id
    name
    username
    admin
    createdAt
    createdBy
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;