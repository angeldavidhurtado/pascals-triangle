class Tooltip {
	constructor() {
		this.tagTooltip = this.createTagTooltip()

		document.addEventListener('mousemove', e => {
			const value = e.target?.value
			if (!value) return this.tagTooltip.style.display = 'none'
			this.tagTooltip.style.display = 'block'
			this.tagTooltip.innerText = value
			this.tagTooltip.style.top = `${e.pageY - 30}px`
			this.tagTooltip.style.left = `${e.pageX}px`
		})
	}


	createTagTooltip = () => {
		const tagTooltip = document.createElement('div')
		tagTooltip.className = 'tooltip'
		document.body.appendChild(tagTooltip)
		return tagTooltip
	}
}


document.addEventListener('DOMContentLoaded', () => {
	const tooltip = new Tooltip()
})
