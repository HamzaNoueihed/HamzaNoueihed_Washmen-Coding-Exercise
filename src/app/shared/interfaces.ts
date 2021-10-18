import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

export interface ICustomer {
    id: number;
    organization: string;
    location: string;
    address: string;
    distance: number;
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface IApiResponse {
    status: boolean;
    error?: string;
}
