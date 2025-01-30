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
        const response = await fetch(
          "https://api.studio.thegraph.com/query/45871/genghis-kahn-ai-token/version/latest",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: GET_MEMBERS }),
          }
        );

        const responseData = await response.json();
        const fetchedMembers = responseData?.data?.activeMembers ?? [];
        setMembers(fetchedMembers);
      } catch (error) {
        setError("Error fetching members");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { members, loading, error };
}
