import { gql } from '@apollo/client';

const ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        link
        title
      }
    }
  }
`;
