import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { bankType } from './bank.entity';


export enum transactionStatus  {
  ACCEPTED="ACCEPTED",
  DECLINED="DECLINED"
}

export enum transactionType{
  OUTDEPOSIT="OUTDEPOSIT",
  OUTWITHDRAW="OUTWITHDRAW",
  INDEPOSIT="INDEPOSIT",
  INWITHDRAW="INWITHDRAW",
}


@ObjectType()
@Schema()
export class Transaction {
  @Field(() => String)
  @Prop()
  type: transactionType;
  @Field(() => Int)
  @Prop()
  amount: number;
  @Field(() => String)
  @Prop()
  from: bankType;
  @Field(() => String)
  @Prop()
  to: bankType;
  @Field(() => ID)
  @Prop()
  toId: mongoose.Schema.Types.ObjectId;
  @Field(() => ID)
  @Prop()
  fromId: mongoose.Schema.Types.ObjectId;
  @Prop()
  @Field(()=>String)
  status: transactionStatus
  @Field(() => String)
  @Prop({default: "-"})
  requestId: string;
  @Field(() => ID)
  @Prop()
  userId: mongoose.Schema.Types.ObjectId;
}


export type TransactionDocument = Transaction & Document;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
