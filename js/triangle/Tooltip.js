document.addEventListener('contextmenu', e => e.preventDefault())
	
class Tooltip {
	constructor() {
		this.tagTooltip = this.createTagTooltip()
		document.addEventListener('mousemove', this.onHoverShowTooltip)
		document.addEventListener('touchstart', this.handleTouchStart)
	}


	onHoverShowTooltip = e => {
		if (this.isTouchDevice()) return
		const value = e.target?.value
		if (!value) return this.tagTooltip.style.display = 'none'
		this.showTooltip(value, e.pageX, e.pageY)
	}


	handleTouchStart = e => {
		const value = e.target?.value
		if (!value) return
		const touch = e.touches[0]
		this.showTooltip(value, touch.pageX, touch.pageY)
	}


	isTouchDevice = () => {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0
	}


	createTagTooltip = () => {
		const tagTooltip = document.createElement('div')
		tagTooltip.className = 'tooltip'
		document.body.appendChild(tagTooltip)
		return tagTooltip
	}


	showTooltip = (value, x, y) => {
		this.tagTooltip.innerText = value
		this.tagTooltip.style.display = 'block'
		this.tagTooltip.style.transform = `translate(${x}px, ${y - 30}px)`
	}
}


document.addEventListener('DOMContentLoaded', () => {
	const tooltip = new Tooltip()
})
