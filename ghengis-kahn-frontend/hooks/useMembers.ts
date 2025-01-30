import { useState, useEffect } from "react";

interface KahnMember {
  id: string;
  account: string;
  ak: string;
  subscribedTxHash?: string;
}

const GET_MEMBERS = `
{
  activeMembers(first: 1000) {
    id
    account
    ak
    subscribedTxHash
  }
}
`;

export function useMembers() {
  const [members, setMembers] = useState<KahnMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching members with query:", GET_MEMBERS);
        const response = await fetch(
          `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_API_KEY}/subgraphs/id/38B8w362hanTBQBUVKKjZvjJpfuAnWrho9jGKhBEPuFr`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: GET_MEMBERS }),
          }
        );

        const responseData = await response.json();
        console.log("Response data:", responseData);

        const fetchedMembers = responseData?.data?.activeMembers ?? [];
        setMembers(fetchedMembers);
      } catch (error) {
        console.error("Error fetching members:", error);
        setError("Error fetching members");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { members, loading, error };
}
