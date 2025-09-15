import React, { createContext, useContext, useState } from "react";

export interface Upload {
  id: string;
  title: string;
  category: string;
  department: string;
  uploaderId: string;
  createdAt: Date;
}

interface DataContextType {
  uploads: Upload[];
  searchUploads: (
    query?: string,
    category?: string,
    department?: string,
    customDepartment?: string
  ) => Upload[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uploads] = useState<Upload[]>([
    {
      id: "1",
      title: "Maize Notes",
      category: "Agriculture",
      department: "Agri",
      uploaderId: "user1",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Rice Guide",
      category: "Agriculture",
      department: "Agri",
      uploaderId: "user2",
      createdAt: new Date(),
    },
  ]);

  const searchUploads = (
    query?: string,
    category?: string,
    department?: string,
    customDepartment?: string
  ) => {
    return uploads.filter((u) => {
      const matchesQuery = query ? u.title.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesCategory = category ? u.category === category : true;
      const matchesDepartment = department
        ? u.department === department || (department === "Others" && customDepartment === u.department)
        : true;
      return matchesQuery && matchesCategory && matchesDepartment;
    });
  };

  return (
    <DataContext.Provider value={{ uploads, searchUploads }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
