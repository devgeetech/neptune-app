import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query getCurrentEvents{
    current_event {
      _id
      event_type
      location_frequency
      locations
    }
  }
`;

export default function DataHydrator() {
    const { data, loading, error } = useQuery(QUERY);

    if (error) {
        return error
    }

    if (loading) {
        console.log("loading...")
    }

    if (data) {
        return data
    }

    return null
}