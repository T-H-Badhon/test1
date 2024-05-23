"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const addFlatIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flat.create({
        data: payload,
    });
    return result;
});
const getAllFlatFromDB = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page = 1, limit = 10, sortBy, sortOrder = 'desc', availability } = params;
    // Prepare filter options based on query parameters
    const filterOptions = {};
    if (searchTerm) {
        filterOptions.OR = [
            { location: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { utilitiesDescription: { contains: searchTerm, mode: 'insensitive' } }
        ];
    }
    if (availability) {
        filterOptions.availability = availability === 'true' ? true : false;
    }
    // Prepare sorting options
    const orderBy = {};
    if (sortBy) {
        orderBy[sortBy] = sortOrder === 'desc' ? 'desc' : 'asc';
    }
    // Retrieve flats with pagination and filters
    const flats = yield prisma_1.default.flat.findMany({
        where: filterOptions,
        orderBy,
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit)
    });
    // Count total number of flats
    const total = yield prisma_1.default.flat.count({ where: filterOptions });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: flats
    };
});
// const getAllFlatFromDB = async(params:any,option:any) => {
// //   const {limit,page,skip} =paginationHelper.calculatePagination(option);
//   const {searchTerm,...filterData} = params;
//   const {limit,page} = option;
//   console.log(limit,page)
//   const condition:Prisma.FlatWhereInput[] = [];
//   if(searchTerm){
//       condition.push({
//           OR:flatSearchAbleFields.map((field)=> ({
//               [field]: {
//                   contains: searchTerm,
//                   mode: "insensitive"
//               }
//           }))
//       })
//   }
//   if (Object.keys(filterData).length > 0) {
//     condition.push({
//         AND: Object.keys(filterData).map((key) => ({
//             [key]: {
//                 equals: typeof filterData[key] === 'string' ? JSON.parse(filterData[key]) : filterData[key],
//             }
//         }))
//     })
// }
//   const arrayToObj:Prisma.FlatWhereInput ={AND:condition}
//   const result = await prisma.flat.findMany({
//       where:arrayToObj,
//       skip: (page-1)*limit,
//       take: limit,
//   orderBy:option.sortBy &&  option.sortOrder ? {
//       [option.sortBy]:option.sortOrder
//   } : {
//       createdAt:'desc'
//   }
//   });
//   const total=await prisma.flat.count({
//       where:arrayToObj
//   })
//   return {
//       meta:{
//           page,
//           limit,
//           total
//       },
//       data:result
//   };
// }
const updateFlatFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.flat.findUniqueOrThrow({
        where: {
            id,
        }
    });
    const result = yield prisma_1.default.flat.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.FlatServices = {
    addFlatIntoDB,
    getAllFlatFromDB,
    updateFlatFromDB
};
