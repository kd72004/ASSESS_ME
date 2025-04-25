import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import axios from "axios";

const ADashboard = () => {
  const [creators, setCreators] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/creators/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCreators(res.data.data);
      } catch (err) {
        console.error("Failed to fetch creators", err);
      }
    };
    fetchCreators();
  }, [token]);

  const handleDeleteClick = (creator) => {
    setSelectedCreator(creator);
    setShowDeleteDialog(true);
  };
  const creatorId= selectedCreator?.creatorId;
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/admin/creators/remove/${creatorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCreators(creators.filter(c => c.creatorId !== selectedCreator.creatorId));
      setShowDeleteDialog(false);
    } catch (err) {
      console.error("Failed to delete creator", err);
    }
  };

  const handleViewClick = (creator) => {
    setSelectedCreator(creator);
    setShowViewDialog(true);
  };

  return (
    <>
      <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto">
        <div className="p-6 bg-white shadow rounded-xl text-black">
          <h2 className="text-xl font-bold mb-4">Exam Details</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="p-2 text-left">Creator Name</th>
                <th className="p-2 text-left">Creator Email</th>
                <th className="p-2 text-left">Total Exams</th>
                <th className="p-2 text-left">Total Students</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {creators.map((creator, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{creator.creatorName}</td>
                  <td className="p-2">{creator.creatorEmail}</td>
                  <td className="p-2">{creator.totalExams}</td>
                  <td className="p-2">{creator.totalStudents}</td>
                  <td className="p-2 space-x-2">
                    <Button
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700"
                      size="icon"
                      onClick={() => handleDeleteClick(creator)}
                    >
                      <Trash2 size={16} />
                    </Button>
                    <Button
                      variant="success"
                      size="icon"
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => handleViewClick(creator)}
                    >
                      <Eye size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete Confirmation Popup */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent className="bg-white shadow-lg text-black">
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="hover:bg-gray-950 hover:text-white"
                  variant="secondary"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="hover:bg-gray-950 hover:text-white"
                  variant="secondary"
                  onClick={handleConfirmDelete}
                >
                  Confirm Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* View Creator Popup */}
          <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
            <DialogContent className="bg-white shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl text-black">Creator Details</DialogTitle>
              </DialogHeader>
              <div className="text-sm text-black">
                <p>
                  <strong>Name:</strong> {selectedCreator?.creatorName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedCreator?.creatorEmail}
                </p>
                <p>
                  <strong>Total Exams:</strong> {selectedCreator?.totalExams}
                </p>
                <p>
                  <strong>Total Students:</strong> {selectedCreator?.totalStudents}
                </p>
                <p>
                  <strong>Created At:</strong> {selectedCreator?.createdAt}
                </p>
              </div>
              <DialogFooter>
                <Button
                  className="hover:text-black hover:bg-white hover:border-2"
                  onClick={() => setShowViewDialog(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ADashboard;
