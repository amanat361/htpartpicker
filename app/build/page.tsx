import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/table'
import SectionHeading from '../components/section'

function BuildTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Component</TableHeader>
          <TableHeader>Selection</TableHeader>
          <TableHeader>Price</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Part</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Link</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default function BuildPage() {
  return (
    <div className='w-full'>
      <SectionHeading title="Build" />
      <BuildTable />
    </div>
  )
}