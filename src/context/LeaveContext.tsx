// LeaveContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { leaveService } from '../api/leaveService';
import { LeaveRequest, LeaveStatusUpdate, StatusCount, Student } from '../types';

interface LeaveContextType {
    leaveRequests: LeaveRequest[];
    loading: boolean;
    error: string | null;
    statusCounts: StatusCount;
    fetchLeaveRequests: () => Promise<void>;
    updateLeaveStatus: (update: LeaveStatusUpdate) => Promise<void>;
    allStudents: Student[];
    fetchAllStudents: () => Promise<void>;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export const useLeaveContext = () => {
    const context = useContext(LeaveContext);
    if (!context) {
        throw new Error('useLeaveContext must be used within a LeaveProvider');
    }
    return context;
};

interface LeaveProviderProps {
    children: ReactNode;
}

export const LeaveProvider: React.FC<LeaveProviderProps> = ({ children }) => {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [allStudents, setAllStudents] = useState<Student[]>([]);
    const [statusCounts, setStatusCounts] = useState<StatusCount>({
        pending: 0,
        approved: 0,
        rejected: 0,
        total: 0
    });

    const calculateStatusCounts = useCallback((requests: LeaveRequest[]): StatusCount => {
        const counts = {
            pending: 0,
            approved: 0,
            rejected: 0,
            total: requests.length
        };

        requests.forEach(request => {
            if (request.status === 'pending') counts.pending++;
            else if (request.status === 'approved') counts.approved++;
            else if (request.status === 'rejected') counts.rejected++;
        });

        return counts;
    }, []);

    const fetchAllStudents = useCallback(async () => {
        setError(null);
        try {
            const data = await leaveService.getAllStudents();
            setAllStudents(data);
            console.log("LeaveContext - Fetched students data:", data);
        } catch (err: any) {
            setError('Failed to fetch students. Please try again later.');
            console.error('Error fetching all students:', err);
            setAllStudents([]);
        }
    }, []);

    const fetchLeaveRequests = useCallback(async () => {
        setError(null);
        try {
            const data = await leaveService.getAllLeaveRequests();
            setLeaveRequests(data);
            setStatusCounts(calculateStatusCounts(data));
            console.log("LeaveContext - Fetched leave requests:", data);
        } catch (err: any) {
            setError('Failed to fetch leave requests. Please try again later.');
            console.error('Error fetching leave requests:', err);
            setLeaveRequests([]);
            setStatusCounts({ pending: 0, approved: 0, rejected: 0, total: 0 });
        }
    }, [calculateStatusCounts]);

    const updateLeaveStatus = async (update: LeaveStatusUpdate) => {
        setLoading(true);
        setError(null);
        try {
            await leaveService.updateLeaveStatus(update);
            await Promise.all([fetchLeaveRequests(), fetchAllStudents()]);
        } catch (err: any) {
            setError('Failed to update leave status. Please try again.');
            console.error('Error updating leave status:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initialFetch = async () => {
            setLoading(true);
            setError(null);
            try {
                await Promise.all([fetchLeaveRequests(), fetchAllStudents()]);
            } catch (err: any) {
                console.error("Initial data fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };

        initialFetch();
    }, [fetchLeaveRequests, fetchAllStudents]);

    const value = {
        leaveRequests,
        loading,
        error,
        statusCounts,
        fetchLeaveRequests,
        updateLeaveStatus,
        allStudents,
        fetchAllStudents
    };

    return <LeaveContext.Provider value={value}>{children}</LeaveContext.Provider>;
};