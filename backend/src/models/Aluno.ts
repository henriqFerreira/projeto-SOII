import { AllowNull, DataType, Model, Table, Column } from "sequelize-typescript";

@Table({ tableName: "Aluno", timestamps: false })
class Aluno extends Model {
	@AllowNull(false)
	@Column({ type: DataType.STRING })
	nome!: string;

	@AllowNull(false)
	@Column({ type: DataType.FLOAT  })
	nota!: number;
}

export default Aluno;
