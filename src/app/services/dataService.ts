import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { ContainerItem } from '../models/containerItem';
import { Category } from '../models/category';
import { ContainerService } from './containerService';
import { ContainerItemsService } from './containerItemsService';
import { CategoryService } from './categoryService';
import { switchMap, tap } from 'rxjs/operators';
import { Container } from '../models/container';
import { MongooseFilterQuery } from 'mongoose';
import { ShoppingItem } from '../models/shoppingItem';
import { ShoppingItemsService } from './shoppingItemsService';
import { Group } from '../models/group';
import { GroupService } from './groupService';

@Injectable()
export class DataService {

    private containersSubject: BehaviorSubject<Container[]>;
    private containerItemsSubject: BehaviorSubject<ContainerItem[]>;
    private shoppingItemsSubject: BehaviorSubject<ShoppingItem[]>;
    private categoriesSubject: BehaviorSubject<Category[]>;
    private groupServiceSubject: BehaviorSubject<Group[]>;
    private dataLoadingSubject: BehaviorSubject<boolean>;
    private cache: {};

    constructor(
        private groupService: GroupService,
        private containerService: ContainerService,
        private containerItemsService: ContainerItemsService,
        private shoppingItemsService: ShoppingItemsService,
        private categoryService: CategoryService) {
        this.shoppingItemsSubject = new BehaviorSubject<ShoppingItem[]>([]);
        this.containersSubject = new BehaviorSubject<Container[]>([]);
        this.containerItemsSubject = new BehaviorSubject<ContainerItem[]>([]);
        this.categoriesSubject = new BehaviorSubject<Category[]>([]);
        this.groupServiceSubject = new BehaviorSubject<Group[]>([]);
        this.dataLoadingSubject = new BehaviorSubject<boolean>(false);
    }

    public get LoadingState(): Observable<boolean> {
        return this.dataLoadingSubject.asObservable();
    }

    public loadContainers(
        filter: any = null,
        sort: any = null,
        limit: number = null,
        skip: number = null): Observable<Container[]> {
        this.dataLoadingSubject.next(true);
        return this.containerService.getList(filter)
            .pipe(switchMap(data => {
                data = data.map(d => new Container(d));
                this.containersSubject.next(data as Container[]);
                this.dataLoadingSubject.next(false);
                return of(data as Container[]);
            }));
    }

    public loadContainerItems(
        filter: any = null,
        sort: any = null,
        limit: number = null,
        skip: number = null): Observable<ContainerItem[]> {
        this.dataLoadingSubject.next(true);
        return this.containerItemsService.getList(filter)
            .pipe(switchMap(data => {
                data = data.map(d => new ContainerItem(d));
                this.containerItemsSubject.next(data as ContainerItem[]);
                this.dataLoadingSubject.next(false);
                return of(data as ContainerItem[]);
            }));
    }

    public loadShoppingItems(
        filter: any = null,
        sort: any = null,
        limit: number = null,
        skip: number = null): Observable<ShoppingItem[]> {
        this.dataLoadingSubject.next(true);
        return this.shoppingItemsService.getList(filter)
            .pipe(switchMap(data => {
                data = data.map(d => new ShoppingItem(d));
                this.shoppingItemsSubject.next(data as ShoppingItem[]);
                this.dataLoadingSubject.next(false);
                return of(data as ShoppingItem[]);
            }));
    }

    public loadCategories(
        filter: any = null,
        sort: any = null,
        limit: number = null,
        skip: number = null): Observable<Category[]> {
        this.dataLoadingSubject.next(true);
        return this.categoryService.getList(filter)
            .pipe(switchMap(data => {
                data = data.map(d => new Category(d));
                this.categoriesSubject.next(data as Category[]);
                this.dataLoadingSubject.next(false);
                return of(data as Category[]);
            }));
    }

    public loadGroups(
        filter: any = null,
        sort: any = null,
        limit: number = null,
        skip: number = null): Observable<Group[]> {
        return this.groupService.getList(filter)
            .pipe(switchMap(data => {
                data = data.map(d => new Group(d));
                this.groupServiceSubject.next(data as Group[]);
                return of(data as Group[]);
            }));
    }

    public loadMemberGroups(
        filter: any = null,
        sort: any = null,
        limit: number = null,
        skip: number = null): Observable<Group[]> {
        return this.groupService.getMemberList(filter)
            .pipe(switchMap(data => {
                data = data.map(d => new Group(d));
                this.groupServiceSubject.next(data as Group[]);
                return of(data as Group[]);
            }));
    }

    public loadContainersCount(
        filter: any = null,
        sort: any = null,
        limit: number = null,
        skip: number = null): Observable<number> {
        return this.containerService.getCount(filter)
            .pipe(switchMap(count => {
                return of(count);
            }));
    }

    public loadContainerItemsCount(
        filter: any = null,
        sort: any = null,
        limit: number = null,
        skip: number = null): Observable<number> {
        return this.containerItemsService.getCount(filter)
            .pipe(switchMap(count => {
                return of(count);
            }));
    }

    public loadShoppingItemsCount(
        filter: any = null,
        sort: any = null,
        limit: number = null,
        skip: number = null): Observable<number> {
        return this.shoppingItemsService.getCount(filter)
            .pipe(switchMap(count => {
                return of(count);
            }));
    }

    public loadCategoriesCount(
        filter: any = null,
        sort: any = null,
        limit: number = null,
        skip: number = null): Observable<number> {
        return this.categoryService.getCount(filter)
            .pipe(switchMap(count => {
                return of(count);
            }));
    }

    public getContainers(): Observable<Container[]> {
        return this.containersSubject.asObservable();
    }

    public getGroupss(): Observable<Group[]> {
        return this.groupServiceSubject.asObservable();
    }

    public getContainerItems(): Observable<ContainerItem[]> {
        return this.containerItemsSubject.asObservable();
    }

    public getShoppingItems(): Observable<ShoppingItem[]> {
        return this.shoppingItemsSubject.asObservable();
    }

    public getCategories(): Observable<Category[]> {
        return this.categoriesSubject.asObservable();
    }
}
