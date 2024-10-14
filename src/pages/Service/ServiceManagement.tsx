// import React, { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import {
//   Button,
//   Input,
//   Select,
//   Card,
//   CardHeader,
//   CardContent,
//   Table,
//   TableHead,
//   TableRow,
//   TableHeader,
//   TableBody,
//   TableCell,
// } from "../components/ui";

// interface Service {
//   id: number;
//   name: string;
//   status: "operational" | "degraded" | "partial" | "major";
// }

// const ServiceManagement: React.FC = () => {
//   const [services, setServices] = useState<Service[]>([]);
//   const [newServiceName, setNewServiceName] = useState("");
//   const [newServiceStatus, setNewServiceStatus] =
//     useState<Service["status"]>("operational");
//   const { authAxios } = useAuth();

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await authAxios.get<Service[]>("/api/services/");
//       setServices(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   const createService = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await authAxios.post("/api/services/", {
//         name: newServiceName,
//         status: newServiceStatus,
//       });
//       setNewServiceName("");
//       setNewServiceStatus("operational");
//       fetchServices();
//     } catch (error) {
//       console.error("Error creating service:", error);
//     }
//   };

//   const updateServiceStatus = async (
//     serviceId: number,
//     newStatus: Service["status"]
//   ) => {
//     try {
//       await authAxios.patch(`/api/services/${serviceId}/`, {
//         status: newStatus,
//       });
//       fetchServices();
//     } catch (error) {
//       console.error("Error updating service status:", error);
//     }
//   };

//   const deleteService = async (serviceId: number) => {
//     try {
//       await authAxios.delete(`/api/services/${serviceId}/`);
//       fetchServices();
//     } catch (error) {
//       console.error("Error deleting service:", error);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <h2 className="text-2xl font-bold">Create New Service</h2>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={createService} className="flex space-x-2">
//             <Input
//               value={newServiceName}
//               onChange={(e) => setNewServiceName(e.target.value)}
//               placeholder="Enter service name"
//               required
//             />
//             <Select
//               value={newServiceStatus}
//               onChange={(e) =>
//                 setNewServiceStatus(e.target.value as Service["status"])
//               }
//             >
//               <option value="operational">Operational</option>
//               <option value="degraded">Degraded Performance</option>
//               <option value="partial">Partial Outage</option>
//               <option value="major">Major Outage</option>
//             </Select>
//             <Button type="submit">Create Service</Button>
//           </form>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <h2 className="text-2xl font-bold">Service List</h2>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableHeader>Service Name</TableHeader>
//                 <TableHeader>Status</TableHeader>
//                 <TableHeader>Actions</TableHeader>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {services.map((service) => (
//                 <TableRow key={service.id}>
//                   <TableCell>{service.name}</TableCell>
//                   <TableCell>
//                     <Select
//                       value={service.status}
//                       onChange={(e) =>
//                         updateServiceStatus(
//                           service.id,
//                           e.target.value as Service["status"]
//                         )
//                       }
//                     >
//                       <option value="operational">Operational</option>
//                       <option value="degraded">Degraded Performance</option>
//                       <option value="partial">Partial Outage</option>
//                       <option value="major">Major Outage</option>
//                     </Select>
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       onClick={() => deleteService(service.id)}
//                       variant="destructive"
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ServiceManagement;
