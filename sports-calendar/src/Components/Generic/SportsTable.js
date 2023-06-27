import { Table } from 'reactstrap';
import SportsTableRow from './SportsTableRow';

const SportsTable = ({ props }) => {

    const rows = [];

    props.data.forEach((data) => {
        rows.push(
            <SportsTableRow data={data} key={data.id} />
        )
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th>Table Header</th>
                    {/* fill with own table headers*/}
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )

}

export default SportsTable;