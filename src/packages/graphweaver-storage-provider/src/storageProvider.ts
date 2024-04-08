import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { graphweaverMetadata, GraphQLID } from '@exogee/graphweaver';

export enum StorageType {
	S3 = 's3',
}

type StorageConfig = {
	type: StorageType;
	bucketName: string;
	region?: string;
	expiresIn?: number;
};

export interface IStorageProvider {
	getDownloadUrl(key: string): Promise<string>;
}

export interface IStorageResolver {
	getUploadUrl(key: string): Promise<string>;
}
const EXPIRE_TIME = 3600;

export const addMediaOperations = (config: StorageConfig) => {
	const storageProvider = new S3StorageProvider(config);

	graphweaverMetadata.addQuery({
		name: 'getUploadUrl',
		getType: () => GraphQLID,

		// @todo: Fix type on resolver for Add Query when we understand the type signature better.
		resolver: (({ key }: { key: string }) => storageProvider.getUploadUrl(key)) as any,
		// args: {
		// 	key: GraphQLID,
		// },
	});
};

// @Resolver()
// export class S3StorageResolver {
// 	private storageProvider: S3StorageProvider;
// 	constructor() {
// 		this.storageProvider = new S3StorageProvider(config);
// 	}

// 	@Mutation(() => String)
// 	async getUploadUrl(@Arg('key', () => ID) key: string): Promise<string> {}

// 	@Query(() => String)
// 	async getDownloadUrl(@Arg('key', () => ID) key: string): Promise<string> {
// 		const downloadURL = await this.storageProvider.getDownloadUrl(key);
// 		return downloadURL;
// 	}
// }

export class S3StorageProvider {
	bucketName: string;
	region: string | undefined;
	expiresIn: number;

	constructor(config: StorageConfig) {
		this.bucketName = config.bucketName;
		this.region = config.region;
		this.expiresIn = config.expiresIn || EXPIRE_TIME;
	}

	async getUploadUrl(key: string): Promise<string> {
		if (!this.bucketName) throw new Error('Missing required env AWS_S3_BUCKET');

		const s3 = new S3Client({
			region: this.region,
		});

		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		const uploadURL = await getSignedUrl(s3, command, { expiresIn: this.expiresIn });
		return uploadURL;
	}

	// async getDownloadUrl(@Arg('key', () => ID) key: string): Promise<string> {
	// 	if (!this.bucketName) throw new Error('Missing required env AWS_S3_BUCKET');

	// 	const s3 = new S3Client({
	// 		region: this.region,
	// 	});

	// 	const command = new GetObjectCommand({ Bucket: this.bucketName, Key: key });
	// 	const downloadURL = getSignedUrl(s3, command, { expiresIn: this.expiresIn });

	// 	return downloadURL;
	// }
}
