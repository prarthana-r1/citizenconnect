export const fetchEligibleSchemes = async (formData: any) => {
    try {
      const response = await fetch("/api/check-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch eligible schemes");
      }
  
      return response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };
  