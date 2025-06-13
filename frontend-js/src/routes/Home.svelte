<script>
	import '@carbon/charts-svelte/styles.css'
	import "carbon-components-svelte/css/all.css";
	import { BarChartSimple, PieChart } from '@carbon/charts-svelte'
	import {
    //Content,
    Grid,
    Row,
    Column,
	} from "carbon-components-svelte";
</script>

  <Grid>
    <Row>
<PieChart
  data={[
	  {
		group: '2V2N 9KYPM version 1',
		value: 20000
	  },
	  {
		group: 'L22I P66EP L22I P66EP L22I P66EP',
		value: 65000
	  },
	  {
		group: 'JQAI 2M4L1',
		value: 75000
	  },
	  {
		group: 'J9DZ F37AP',
		value: 1200
	  },
	  {
		group: 'YEL48 Q6XK YEL48',
		value: 10000
	  },
	  {
		group: 'Misc',
		value: 25000
	  }
	  ]}
	  
  options={{
    title: 'Pie',
	resizable: false,
	width: '45%',
  }}
  />

<BarChartSimple
	data={[
		{ group: 'Qty', value: 65000 },
		{ group: 'More', value: 29123 },
		{ group: 'Sold', value: 35213 },
		{ group: 'Restocking', value: 51213 },
		{ group: 'Misc', value: 16932 }
	]}
	options={{
		title: 'Simple bar (discrete)',
		resizable: false,
		width: '45%',
		axes: {
			left: { mapsTo: 'value' },
			bottom: { mapsTo: 'group', scaleType: 'labels' }
		}
	}} />
    </Row>
  </Grid>


